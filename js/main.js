(function () {
  "use strict";

  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  function fillUtmFieldsFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var hasAny = UTM_KEYS.some(function (key) {
      return params.has(key);
    });
    if (!hasAny) return;

    UTM_KEYS.forEach(function (key) {
      if (!params.has(key)) return;
      var val = params.get(key);
      document.querySelectorAll('input[name="' + key + '"]').forEach(function (el) {
        el.value = val;
      });
    });
  }

  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function initHeroVideos() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".hero-demo-video__item"));
    if (!items.length) return;

    function pauseOtherVideos(activeVideo) {
      items.forEach(function (item) {
        var otherVideo = item.querySelector(".hero-demo-video__media");
        if (!otherVideo || otherVideo === activeVideo) return;
        otherVideo.pause();
      });
    }

    items.forEach(function (item) {
      var video = item.querySelector(".hero-demo-video__media");
      var button = item.querySelector(".hero-demo-video__toggle");
      var pauseFlashTimer = null;
      if (!video || !button) return;

      if ("disablePictureInPicture" in video) {
        video.disablePictureInPicture = true;
      }
      video.addEventListener("contextmenu", function (e) {
        e.preventDefault();
      });

      function clearPauseFlash() {
        if (!pauseFlashTimer) return;
        window.clearTimeout(pauseFlashTimer);
        pauseFlashTimer = null;
      }

      function showPlayState() {
        item.classList.remove("is-playing", "is-pause-flash");
        item.classList.add("is-paused");
        button.setAttribute("data-state", "play");
        button.setAttribute("aria-label", "Play demo video");
        button.setAttribute("aria-pressed", "false");
      }

      function syncPlayingState() {
        clearPauseFlash();
        item.classList.remove("is-paused", "is-pause-flash");
        item.classList.add("is-playing");
        button.setAttribute("data-state", "pause");
        button.setAttribute("aria-label", "Pause demo video");
        button.setAttribute("aria-pressed", "true");
      }

      function syncPausedState(showPauseBriefly) {
        clearPauseFlash();
        showPlayState();
      }

      function togglePlayback() {
        if (video.paused || video.ended) {
          pauseOtherVideos(video);
          var playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(function () {
              syncPausedState(false);
            });
          }
          return;
        }

        video.pause();
      }

      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        togglePlayback();
      });

      video.addEventListener("play", function () {
        syncPlayingState();
      });
      video.addEventListener("pause", function () {
        syncPausedState(!video.ended);
      });
      video.addEventListener("ended", function () {
        syncPausedState(false);
      });
      video.addEventListener("loadedmetadata", function () {
        showPlayState();
      });

      showPlayState();
    });
  }

  function initVideoTracking() {
    var videos = document.querySelectorAll(".hero-demo-video__media");
    if (!videos.length) return;

    Array.prototype.forEach.call(videos, function (video) {
      var sourceEl = video.querySelector("source");
      var src = (sourceEl && sourceEl.src) || "";
      var label = src.toLowerCase().indexOf("mobile") !== -1 ? "hero_mobile" : "hero_desktop";
      var milestones = [25, 50, 75, 100];
      var fired = new Set();

      function push(eventName, extra) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(
          Object.assign({ event: eventName, video_label: label }, extra || {})
        );
      }

      video.addEventListener("play", function () {
        push("video_play");
      });

      video.addEventListener("timeupdate", function () {
        if (!video.duration) return;
        var pct = (video.currentTime / video.duration) * 100;
        milestones.forEach(function (milestone) {
          if (pct >= milestone && !fired.has(milestone)) {
            fired.add(milestone);
            push("video_progress", { video_percent: milestone });
          }
        });
      });
    });
  }

  function initAnalyticsEvents() {
    // --- SCROLL DEPTH (page) ---
    var scrollDepthFired = { 50: false, 75: false, 100: false };
    var scrollTicking = false;

    function getScrollPercent() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return 0;
      return Math.round((scrollTop / docHeight) * 100);
    }

    window.addEventListener(
      "scroll",
      function () {
        if (scrollTicking) return;
        scrollTicking = true;
        requestAnimationFrame(function () {
          scrollTicking = false;
          var pct = getScrollPercent();
          [50, 75, 100].forEach(function (threshold) {
            if (scrollDepthFired[threshold]) return;
            if (pct < threshold) return;
            scrollDepthFired[threshold] = true;
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "scroll_depth",
              scroll_threshold: threshold,
              page_location: window.location.pathname,
            });
          });
        });
      },
      { passive: true }
    );

    // --- STEP CARD VIEW + COMPLETE ---
    var sections = document.querySelectorAll(".step-card");
    if (!sections.length) return;
    if (!("IntersectionObserver" in window)) return;

    var cardsSeen = Object.create(null);
    var totalCards = sections.length;
    var completeFired = false;

    function parseCardNumberFromId(id) {
      if (!id) return null;
      var parts = String(id).split("-");
      var last = parts[parts.length - 1];
      var n = parseInt(last, 10);
      return Number.isFinite(n) ? n : null;
    }

    var timelineObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          var cardNum = parseCardNumberFromId(entry.target && entry.target.id);
          if (cardNum === null) return;
          if (cardsSeen[cardNum]) return;

          cardsSeen[cardNum] = true;
          window.dataLayer = window.dataLayer || [];

          var headingEl = entry.target.querySelector(".step-heading");
          var title = headingEl ? headingEl.textContent.trim() : "card_" + cardNum;

          window.dataLayer.push({
            event: "timeline_card_view",
            card_number: cardNum,
            card_title: title,
          });

          if (!completeFired && Object.keys(cardsSeen).length === totalCards) {
            completeFired = true;
            window.dataLayer.push({ event: "timeline_complete" });
          }
        });
      },
      { threshold: 0.55 }
    );

    sections.forEach(function (el) {
      timelineObserver.observe(el);
    });
  }

  /**
   * GDPR cookie banner + GTM Consent Mode v2: persist choice 365d, push dataLayer on user action.
   */
  function initCookieConsent() {
    var NS = window.NogaConsent;
    var gtagFn = window.gtag;
    if (!NS || typeof gtagFn !== "function") return;

    var banner = document.getElementById("cookie-consent-banner");
    var dialogEl = document.getElementById("cookie-preferences-dialog");
    if (!banner) return;

    var COOKIE = NS.COOKIE_NAME || "noga_cookie_consent";
    var MAX_AGE = 365 * 24 * 60 * 60;
    var prefAnalytics = document.getElementById("pref-analytics");
    var prefMarketing = document.getElementById("pref-marketing");
    var btnReject = document.getElementById("cookie-reject-all");
    var btnManage = document.getElementById("cookie-manage");
    var btnAccept = document.getElementById("cookie-accept-all");
    var btnPrefsCancel = document.getElementById("cookie-prefs-cancel");
    var btnPrefsSave = document.getElementById("cookie-prefs-save");

    function hideBanner() {
      banner.setAttribute("hidden", "");
      banner.setAttribute("aria-hidden", "true");
      document.body.classList.remove("has-cookie-banner");
    }

    function showBanner() {
      banner.removeAttribute("hidden");
      banner.setAttribute("aria-hidden", "false");
      document.body.classList.add("has-cookie-banner");
    }

    function writeConsentCookie(analytics, marketing) {
      var payload = JSON.stringify({ v: 1, analytics: analytics, marketing: marketing });
      var secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie =
        COOKIE +
        "=" +
        encodeURIComponent(payload) +
        "; Path=/; Max-Age=" +
        MAX_AGE +
        "; SameSite=Lax" +
        secure;
    }

    function applyUserChoice(analytics, marketing) {
      writeConsentCookie(analytics, marketing);
      NS.applyGtagUpdate(analytics, marketing);
      NS.pushConsentEvent(analytics, marketing);
      hideBanner();
      if (dialogEl && typeof dialogEl.close === "function" && dialogEl.open) {
        dialogEl.close();
      }
    }

    function openPreferencesModal() {
      if (!dialogEl || typeof dialogEl.showModal !== "function") return;
      var stored = NS.getStored();
      if (prefAnalytics) prefAnalytics.checked = stored ? stored.analytics : false;
      if (prefMarketing) prefMarketing.checked = stored ? stored.marketing : false;
      dialogEl.showModal();
    }

    if (NS.getStored()) {
      hideBanner();
    } else {
      showBanner();
    }

    if (btnReject) {
      btnReject.addEventListener("click", function () {
        applyUserChoice(false, false);
      });
    }
    if (btnAccept) {
      btnAccept.addEventListener("click", function () {
        applyUserChoice(true, true);
      });
    }
    if (btnManage) {
      btnManage.addEventListener("click", function () {
        openPreferencesModal();
      });
    }
    if (btnPrefsCancel) {
      btnPrefsCancel.addEventListener("click", function () {
        if (dialogEl && typeof dialogEl.close === "function") dialogEl.close();
      });
    }
    if (btnPrefsSave) {
      btnPrefsSave.addEventListener("click", function () {
        var a = prefAnalytics ? prefAnalytics.checked : false;
        var m = prefMarketing ? prefMarketing.checked : false;
        applyUserChoice(a, m);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillUtmFieldsFromUrl();
    initYear();
    initHeroVideos();
    initVideoTracking();
    initCookieConsent();
    initAnalyticsEvents();
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".btn");
      if (!btn) return;
      if (btn.closest("#cookie-consent-banner, #cookie-preferences-dialog")) return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cta_click",
        button_text: btn.textContent.trim(),
        button_href: btn.getAttribute("href") || "",
        page_location: window.location.pathname,
      });
    });


    // document.querySelectorAll(".waitlist-form").forEach(function (form) {
    //   form.addEventListener("submit", handleSubmit);
    // });
  });
})();

var APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3KbnmJ5B36vMbm20kIRH_1ImRUgFfD_sl7E-Gyv8zL2vWkOBn1w3u6xHsb6H6GG8Yzg/exec";

function handleWaitlistSubmit(formId, emailId) {
  var form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    var statusEl = form.querySelector(".form-status");
    var emailInput = document.getElementById(emailId);
    
    if (!emailInput.checkValidity()) {
      statusEl.textContent = "Please enter a valid email";
      statusEl.classList.remove("is-success");
      statusEl.classList.add("is-error");
      return;
    }

    var email = emailInput.value;

    var payload = {
      email: email,
      utm_source:   form.querySelector("[name='utm_source']").value,
      utm_medium:   form.querySelector("[name='utm_medium']").value,
      utm_campaign: form.querySelector("[name='utm_campaign']").value,
      utm_content:  form.querySelector("[name='utm_content']").value,
      utm_term:     form.querySelector("[name='utm_term']").value
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "waitlist_form_submit",
      form_location: formId === "waitlist-hero" ? "hero" : "footer",
      utm_source: payload.utm_source || "",
      utm_medium: payload.utm_medium || "",
      utm_campaign: payload.utm_campaign || "",
    });

    statusEl.classList.remove("is-error", "is-success");
    statusEl.textContent = "Submitting...";

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      });

      // When using 'no-cors', the response is opaque, meaning we can't read response.json()
      // If the fetch didn't throw a network error, we assume it reached Google successfully.
      statusEl.textContent =
        "You're on the list! We'll be in touch. In the meantime, we've sent you an email. If you don't see our emails, check your spam folder.";
      form.reset();

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "waitlist_signup",
        form_id: formId,
        utm_source: payload.utm_source || "",
        utm_medium: payload.utm_medium || "",
        utm_campaign: payload.utm_campaign || "",
      });
    } catch (err) {
      console.error("Form submission error:", err);
      statusEl.textContent = "Something went wrong. Please try again.";
      statusEl.classList.add("is-error");
    }
  });
}

handleWaitlistSubmit("waitlist-hero", "email-hero");
handleWaitlistSubmit("waitlist-form-footer", "email-footer");

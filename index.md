---
layout: default
---

<!-- HERO -->
<section id="hero">
  <p class="hero-tag">Visual Rock / Metalcore &nbsp;·&nbsp; Seoul, Korea</p>
  <img class="hero-logo" src="{{ site.baseurl }}/assets/images/delrium_logo.png" alt="DELRIUM" />
  <div class="hero-btns">
    <a class="btn btn-primary" href="#schedule">Live Schedule</a>
    <a class="btn" href="{{ site.social.instagram }}" target="_blank">Instagram</a>
    <a class="btn" href="{{ site.social.twitter }}" target="_blank">X</a>
    <a class="btn" href="{{ site.social.youtube }}" target="_blank">YouTube</a>
  </div>
</section>

<!-- ABOUT -->
<section id="about">
  <div class="section-wrap fade-in">
    <h2 class="section-title">About</h2>
    <div class="section-line"></div>
    <p class="about-text">
      When reality cracks,<br>
      whispers through the pain.<br>
      come closer, and burn with us.
    </p>
    <div class="about-tags">
      <span class="tag">Visual Rock</span>
      <span class="tag">Metalcore</span>
      <span class="tag">Seoul, Korea</span>
    </div>
  </div>
</section>

<!-- MEMBERS -->
<section id="members">
  <div class="section-wrap fade-in">
    <h2 class="section-title">Members</h2>
    <div class="section-line"></div>
    <div class="members-grid">
      <div class="member-card">
        <p class="member-name">SJ Hann</p>
        <p class="member-role">Bass · Leader</p>
      </div>
      <div class="member-card">
        <p class="member-name">ch!ka</p>
        <p class="member-role">Guitar</p>
      </div>
      <div class="member-card">
        <p class="member-name">silva</p>
        <p class="member-role">Vocal</p>
      </div>
      <div class="member-card">
        <p class="member-name">H00n</p>
        <p class="member-role">Drums</p>
      </div>
    </div>
  </div>
</section>

<!-- SCHEDULE -->
<section id="schedule">
  <div class="section-wrap fade-in">
    <h2 class="section-title">Live Schedule</h2>
    <div class="section-line"></div>
    {% for month in site.data.schedule %}
    <div class="month-block">
      <p class="month-label">{{ month.month }}</p>
      {% for show in month.shows %}
      <div class="show-item">
        <div class="show-date">
          {{ show.date }}<br>
          <span class="show-day">{{ show.day }}</span>
        </div>
        <div class="show-info">
          {% if show.title %}<p class="show-title">{{ show.title }}</p>{% endif %}
          <p class="show-venue">{{ show.venue }}</p>
        </div>
        {% if show.time %}<span class="show-time">{{ show.time }}</span>{% endif %}
      </div>
      {% endfor %}
    </div>
    {% endfor %}
  </div>
</section>

<!-- VIDEO -->
<section id="video">
  <div class="section-wrap fade-in">
    <h2 class="section-title">Video</h2>
    <div class="section-line"></div>
    <div class="video-grid">
      {% for v in site.data.videos %}
      <div class="video-card">
        <iframe
          src="https://www.youtube.com/embed/{{ v.id }}"
          title="{{ v.title }}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
        <div class="video-info">
          <p class="video-title">{{ v.title }}</p>
          <p class="video-ch">{{ v.channel }}</p>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<!-- STREAMING -->
<section id="streaming">
  <div class="section-wrap fade-in">
    <h2 class="section-title">Streaming</h2>
    <div class="section-line"></div>
    <div class="stream-grid">
      <a class="stream-btn" href="{{ site.social.youtube }}" target="_blank">YouTube</a>
      <a class="stream-btn" href="{{ site.streaming.spotify }}" target="_blank">Spotify</a>
      <a class="stream-btn" href="{{ site.streaming.melon }}" target="_blank">Melon</a>
      <a class="stream-btn" href="{{ site.streaming.apple_music }}" target="_blank">Apple Music</a>
      <a class="stream-btn" href="{{ site.streaming.genie }}" target="_blank">Genie</a>
      <a class="stream-btn" href="{{ site.streaming.bugs }}" target="_blank">Bugs</a>
      <a class="stream-btn" href="{{ site.streaming.flo }}" target="_blank">FLO</a>
      <a class="stream-btn" href="{{ site.streaming.vibe }}" target="_blank">VIBE</a>
    </div>
  </div>
</section>

<!-- GUESTBOOK -->
<section id="guestbook">
  <div class="section-wrap fade-in">
    <h2 class="section-title">Guestbook</h2>
    <div class="section-line"></div>
    <form class="guestbook-form" id="gb-form">
      <input class="gb-input" id="gb-name" type="text" placeholder="이름" maxlength="30" required />
      <textarea class="gb-input" id="gb-msg" placeholder="메시지를 남겨주세요" maxlength="300" required></textarea>
      <button class="btn btn-primary" id="gb-submit" type="submit">남기기</button>
    </form>
    <div class="gb-list" id="gb-list"></div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact">
  <div class="section-wrap fade-in">
    <h2 class="section-title">Contact</h2>
    <div class="section-line"></div>
    <div class="contact-row">
      <a class="btn" href="{{ site.social.instagram }}" target="_blank">Instagram</a>
      <a class="btn" href="{{ site.social.twitter }}" target="_blank">X (Twitter)</a>
      <a class="btn" href="{{ site.social.facebook }}" target="_blank">Facebook</a>
      <a class="btn" href="mailto:{{ site.social.email }}">Email</a>
    </div>
  </div>
</section>

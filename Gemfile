source "https://rubygems.org"

gem "jekyll", "~> 4.3"
# Pin to 2.x: 3.x pulls in sass-embedded (a native gem) which fails to install
# on GitHub Pages CI. 2.x uses sassc, and the site is plain CSS anyway.
gem "jekyll-sass-converter", "~> 2.0"

group :jekyll_plugins do
  gem "jekyll-seo-tag"
end

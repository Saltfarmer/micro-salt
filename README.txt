Copy these files over the micro-salt repo (same paths), then:
  bundle exec jekyll serve      -> http://localhost:4000/micro-salt/
  commit and push

One-time cleanup (the built site was committed by accident; GitHub Pages builds it itself):
  git rm -r --cached _site
  git commit -m "Stop tracking _site"

Posts: no changes needed. Old posts (title: "", date with time) and notes exported from
BlogWriter Mobile both work. A title is optional; if present it shows as a bold first line.

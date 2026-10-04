"""Builds slide_prompts_page.html (copy-button page) from SIH_PPT_Slide_Prompts.md. Run: python3 make_prompt_page.py"""
import html, os, re
import markdown

HERE = os.path.dirname(os.path.abspath(__file__))
md = open(os.path.join(HERE, "SIH_PPT_Slide_Prompts.md")).read()
body = markdown.markdown(md, extensions=["tables", "fenced_code", "sane_lists"])
NAV = ["Rules", "Design system", "Assets", "S1 Title", "S2 Idea", "S3 Technical", "S4 Feasibility", "S5 Impact",
       "S6 References", "Finale S7-12", "Image prompts", "QA checklist"]
toc = []
def h2(m):
    s = f"sec{len(toc)}"; toc.append(s)
    return f'<h2 id="{s}">{m.group(1)}</h2>'
body = re.sub(r"<h2>(.*?)</h2>", h2, body)
count = [0]
def pre(m):
    count[0] += 1
    return (f'<div class="promptbox"><button class="copy" type="button" data-target="p{count[0]}">Copy prompt</button>'
            f'<pre id="p{count[0]}"><code>{m.group(1)}</code></pre></div>')
body = re.sub(r'<pre><code(?: class="[^"]*")?>(.*?)</code></pre>', pre, body, flags=re.S)
body = body.replace("<table>", '<div class="tw"><table>').replace("</table>", "</table></div>")
body = body.replace("<li>[ ]", '<li class="todo">')
nav = "".join(f'<a href="#{s}">{html.escape(NAV[i] if i < len(NAV) else s)}</a>' for i, s in enumerate(toc))
css = open(os.path.join(HERE, "prompt_page.css")).read()
page = f'''<title>PARAMPARA Slide Prompts</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;600&display=swap">
<style>
{css}
</style>
<div class="wrap">
<nav aria-label="Sections">{nav}</nav>
{body}
</div>
<script>
document.querySelectorAll('.copy').forEach(function (b) {{
  b.addEventListener('click', function () {{
    var pre = document.getElementById(b.dataset.target), text = pre.innerText;
    function ok() {{ b.textContent = 'Copied'; b.classList.add('done'); setTimeout(function () {{ b.textContent = 'Copy prompt'; b.classList.remove('done'); }}, 1500); }}
    function fallback() {{ var r = document.createRange(); r.selectNodeContents(pre); var s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Selected: press Ctrl+C'; }}
    try {{ navigator.clipboard.writeText(text).then(ok, fallback); }} catch (e) {{ fallback(); }}
  }});
}});
</script>
'''
open(os.path.join(HERE, "slide_prompts_page.html"), "w").write(page)
print(len(page), "bytes;", count[0], "prompt blocks;", len(toc), "sections")

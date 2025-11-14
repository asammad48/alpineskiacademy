import os
import traceback

def replace_header_footer(lang, file_path, header_content, footer_content):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the start and end of the header
        header_start = content.find('<!-- Top Info Bar -->')
        if header_start == -1:
            header_start = content.find('<div id="header-placeholder">')
        header_end = content.find('</nav>')
        if header_end != -1:
            header_end += len('</nav>')
        else:
            header_end = content.find('<div id="header-placeholder">') + len('<div id="header-placeholder"></div>')


        # Find the start and end of the footer
        footer_start = content.find('<footer>')
        if footer_start == -1:
            footer_start = content.find('<div id="footer-placeholder">')
        footer_end = content.find('</html>')

        if header_start != -1 and header_end != -1 and footer_start != -1:
            # Reconstruct the content with the new header and footer
            new_content = content[:header_start] + header_content + content[header_end:footer_start] + footer_content + content[footer_end:]

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file_path}")
        else:
            print(f"Could not find header/footer in {file_path}")
    except Exception as e:
        print(f"Error processing file {file_path}: {e}")
        traceback.print_exc()


def main():
    # Portuguese
    with open('pt_header.html', 'r', encoding='utf-8') as f:
        pt_header = f.read()
    with open('pt_footer.html', 'r', encoding='utf-8') as f:
        pt_footer = f.read()

    pt_files = [os.path.join('pt', f) for f in os.listdir('pt') if f.endswith('.html')]
    for file_path in pt_files:
        replace_header_footer('pt', file_path, pt_header, pt_footer)

if __name__ == "__main__":
    main()
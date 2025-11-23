import sys
try:
    import PyPDF2
    
    pdf_path = 'T6_AP_SG_Mar21.pdf'
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text() + '\n\n'
        print(text)
except ImportError:
    print("PyPDF2 not available, trying pdfplumber...")
    try:
        import pdfplumber
        pdf_path = 'T6_AP_SG_Mar21.pdf'
        with pdfplumber.open(pdf_path) as pdf:
            text = ''
            for page in pdf.pages:
                text += page.extract_text() + '\n\n'
            print(text)
    except ImportError:
        print("ERROR: No PDF libraries available")
        sys.exit(1)

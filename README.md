# bujhinAI

bujhinAI is a web-based application that generates analogies for concepts provided by the user. It uses a local LLM to generate the analogies and provides a simple web interface to interact with the model.

## Features

-   **Analogy Generation**: Provide a concept and get a simple, single-paragraph analogy.
-   **Web Interface**: A simple and easy-to-use web interface to interact with the model.
-   **Local LLM**: Uses a local GPT4All-compatible model, so no internet connection is required after the initial setup.
-   **GPU Acceleration**: The application is configured to use CUDA for GPU acceleration, which can significantly speed up the analogy generation process.

## Setup and Installation

Follow these steps to set up and run the project in your local environment.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bujhinAI
```

**Note:** This repository contains the language model file, which is several gigabytes in size. If you have `git-lfs` installed, it will be downloaded automatically. If not, you may need to install `git-lfs` and run `git lfs pull` to download the model file.

### 2. Create and activate a virtual environment (Windows example)

It's recommended to use a virtual environment. On Windows (PowerShell) you can run:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

If you're on macOS or Linux, use the equivalent `python -m venv .venv` and `source .venv/bin/activate` commands, then install requirements.



## Running the Application

After setup, run the FastAPI app with `uvicorn`. Example (PowerShell):

```powershell
# from project root
uvicorn main:app --port 8000
```

Open your browser at `http://127.0.0.1:8000`.

## Usage

1.  Open your web browser and navigate to `http://127.0.0.1:8000`.
2.  Enter a concept in the text box.
3.  Click the "Get Analogy" button.
4.  The generated analogy will be displayed below the text box.

## Download PDF with caption

The web UI includes a "Download as PDF" button. When you click it the UI will prompt you to enter a caption. The resulting PDF includes these sections in this order:

1. Caption — the caption you entered in the prompt (also used to build the filename)
2. Definition — the input text you provided in the left textarea
3. Generated response — the analogy produced by the model

The filename is sanitized and appended with a timestamp. If you'd prefer a modal instead of the browser prompt, I can add a Bootstrap modal to the template and wire it to the same behavior.

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

### 2. Create a Virtual Environment

It is recommended to use a virtual environment to manage the project's dependencies.

```bash
python -m venv venv
```

### 3. Activate the Virtual Environment

**On Windows:**

```bash
.\venv\Scripts\activate
```

**On macOS and Linux:**

```bash
source venv/bin/activate
```

### 4. Install Dependencies

Install the required Python packages using `pip`.

```bash
pip install -r requirements.txt
```



## Running the Application

Once you have completed the setup, you can run the application using `uvicorn`.

```bash
uvicorn main:app --reload
```

The application will be available at `http://127.0.0.1:8000`.

## Usage

1.  Open your web browser and navigate to `http://127.0.0.1:8000`.
2.  Enter a concept in the text box.
3.  Click the "Get Analogy" button.
4.  The generated analogy will be displayed below the text box.

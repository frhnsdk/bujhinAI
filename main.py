# Main.py

from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from services.analogy_generator import AnalogyGenerator # Assuming analogy_generator.py is in a 'services' folder

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# The model is loaded here when the FastAPI app starts
analogy_generator = AnalogyGenerator()

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/analogy")
async def get_analogy(text: str = Form(...)):
    # GPT4All is called here
    analogy = analogy_generator.generate_analogy(text)
    return {"analogy": analogy}
# analogy_generator.py

from gpt4all import GPT4All
import os
from typing import Optional

# The 'torch' import is removed as it's not strictly necessary 
# for the gpt4all binding's internal logic.

class AnalogyGenerator:
    """
    An AI that generates analogies using a GPT4All-compatible LLM
    and explicitly targets the CUDA device for GPU acceleration.
    """
    def __init__(self):
        # The model is loaded immediately upon object creation
        self.model: Optional[GPT4All] = self._load_model()

    def _load_model(self) -> GPT4All:
        """Loads the GPT4All model, explicitly requesting the CUDA GPU."""
        
        # NOTE: Ensure this path is correct for your system!
        model_name = "Mistral-7B-Instruct-v0.3-Q4_K_M.gguf"
        model_dir = "models"
        model_path = os.path.join(model_dir, model_name)
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(
                f"Model file not found at {model_path}. "
                f"Please download it and place it in the '{model_dir}' directory."
            )

        # Set device to 'cuda' to force GPU usage.
        # NOTE: The 'cuda' device flag requires the necessary CUDA libraries to be installed.
        gpu_device = 'cuda'
        
        print(f"Loading model: {model_name} with device='{gpu_device}'")
            
        return GPT4All(
            model_name=model_name,
            model_path=model_dir,
            device=gpu_device, # <-- CRITICAL: Forces CUDA usage if available
            n_ctx=2048,
            ngl=100,            # High value to offload most/all layers
            allow_download=False,
            verbose=True
        )

    def generate_analogy(self, text: str) -> str:
        """Generates an analogy based on the user's text input."""
        
        # FIXED PROMPT: New prompt to enforce simple language, single paragraph, and formal tone.
        prompt = (
            f"Explain the following concept in simple terms using a single paragraph analogy. "
            f"Use formal language and avoid slang or emojis.\n\n"
            f"Concept: {text}\n\n"
            f"Analogy:"
        )
        # Use the generate method
        output = self.model.generate(
            prompt,
            max_tokens=250,      # max_tokens
            temp=0.5,            # Lowered temperature slightly for less 'creative' (emoji) output
            top_p=0.9,           # Adjusted top_p for slightly more focused output
            top_k=40,            # top_k
            repeat_penalty=1.1,  # repeat_penalty
        )
        
        return output.strip()

if __name__ == '__main__':
    # Simple test for model loading and generation
    try:
        generator = AnalogyGenerator()
        input_text = "The principle of asynchronous programming"
        print(f"\n--- Analyst is considering: {input_text} ---")
        
        # Use a chat session for generation
        with generator.model.chat_session():
            analogy = generator.generate_analogy(input_text)
            print(f"\nAnalyst: {analogy}\n")
            
    except FileNotFoundError as e:
        print(f"ERROR: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
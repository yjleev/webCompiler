# import requests
# from fastapi import FastAPI
# import subprocess
# import os

# app = FastAPI()

# def run_code(code: str, inputs: str, currect_output: str) -> bool:
#     try:
#         runing_file = "runing_file.py"

#         with open(runing_file, "w") as file:
#             file.write(code)

#         process = subprocess.run(
#             ["python", runing_file],
#             input=inputs,
#             text=True,
#             capture_output=True,
#             timeout=2
#         )
        
#         return process.stdout.strip() == currect_output.strip()
    
#     except subprocess.TimeoutExpired:
#         print("Error: time out")
#         return False
#     except Exception as error:
#         print("Error:", error)
#         return False
#     finally:
#         if os.path.exists(runing_file):
#             os.remove(runing_file)

# @app.post("/api")
# async def run_code_api(request: CodeRequest):
#     result = run_code(request.code, request.inputs, request.expected_output)
#     return {"success": result}
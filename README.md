# Invoice Analyser
This project is powered by LLMs (OpenAI GPT) for extracting useful information from some invoice PDF files in a formatted and structured way
## Demo
Watch th following video:
<a id='demo'>https://youtu.be/og88HsWltI0</a>

## How to run

1. back
- Create a Python3 virtual env
- Activate the environment creatred in the previous step
- cd to back folder
- install the requirements in requirements.txt file
- run the following command
```
uvicorn main:app --port 8086  --reload
```

2. front
- cd into front folder
- run the following command to install the dependencies (you need Node installed on your machine)
```
npm install .
```
- run the following command to start the front-end
```
npm start
```
 
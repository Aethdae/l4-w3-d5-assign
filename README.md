# Dice Rolling App

Keep on rolling with the simple dice manager. Add the dice you wish to roll, and it will roll all of them for you in one simple click. Delete extra dice, clear them all, and add multiple at once.

## Installation

### Backend

- In the /backend directory:
  - `py -m venv .venv` to create a python environment
  - `source .venv/Scripts/activate` to start the environment
  - `py -m pip install -r requirements.txt` to install python requirements to the environment
  - `flask run` to start backend server
  - Or on Windows:
    - `chmod +x run.sh`
    - `./run.sh`

### Frontend

- In the /frontend directory:
  - `npm i` to get dependencies for the front-end.
  - `npm run dev` to start frontend site

## Usage

- Click Roll to roll the dice in the tray.
- Clear will clear out the tray
- Delete will delete the selected die from the dropdown.
- Add will input the input die, or comma-separated values in the input field.
  - e.g. 6,4,5, 6, 6, 12
  - White space is accepted.

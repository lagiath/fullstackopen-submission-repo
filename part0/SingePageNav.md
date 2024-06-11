sequenceDiagram
    participant U as User
    participant B as Browser
    participant S as Server

    U->>B: Input new note data and click 'Save'
    B->>S: POST new note data
    S->>S: Process and save data
    S->>B: Confirm save (response)
    B->>U: Display confirmation/message to User

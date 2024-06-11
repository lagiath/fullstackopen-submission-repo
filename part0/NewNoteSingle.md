sequenceDiagram
    participant U as User
    participant B as Browser
    participant S as Server

    U->>B: Access SPA version of Notes App
    B->>S: Request SPA page
    S->>B: Send SPA assets 
    B->>U: Display SPA


```mermaid
erDiagram

  users {
    String id PK 
    String name  
    String memo  "nullable"
    String company_id  
    }
  

  companies {
    String id PK 
    String name  
    String description  "nullable"
    }
  
    users o{--|| companies : "company"
```

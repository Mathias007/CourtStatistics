export const CourtMessages = {
    GET_COURTS_ERROR: "Wystąpił błąd podczas ładowania sądów",
    GET_COURT_BY_ID_ERROR: "Wystąpił błąd podczas ładowania sądu",
    GET_STATISTICS_BY_COURT_ERROR: "Wystąpił błąd podczas ładowania statystyk",

    ADD_COURT_ERROR: "Wystąpił błąd podczas dodawania statystyk",
    ADD_STATISTICS_ERROR: "Wystąpił błąd podczas dodawania statystyki",
    UPDATE_STATISTICS_ERROR: "Wystąpił błąd podczas aktualizowania statystyki",
    COURT_DELETED: "Sąd został usunięty",
    DELETE_STATISTICS_ERROR: "Wystąpił błąd podczas usuwania statystyki",

    COURT_NOT_FOUND: "Sąd nie został znaleziony",
    STATISTICS_NOT_FOUND:
        "Nie znaleziono statystyk spełniających podane kryteria",
};

export const UserMessages = {
    ALL_FIELDS_REQUIRED: "Wszystkie pola są wymagane",
    USER_ALREADY_EXISTS: "Użytkownik już istnieje",
    REGISTRATION_SUCCESS: "Rejestracja zakończona sukcesem",
    REGISTRATION_ERROR: "Wystąpił błąd podczas rejestracji użytkownika",
    WRONG_EMAIL: "Nie znaleziono użytkownika o podanym adresie email",
    WRONG_PASSWORD: "Podano nieprawidłowe hasło",
    LOGIN_ERROR: "Wystąpił błąd podczas logowania użytkownika",
    USER_NOT_FOUND: "Użytkownik nie znaleziony",
    USER_DELETED: "Użytkownik usunięty",

    GET_USERS_ERROR: "Wystąpił błąd podczas ładowania użytkowników",
    GET_USER_ERROR: "Wystąpił błąd podczas ładowania użytkownika",
    UPDATE_USER_ERROR: "Wystąpił błąd podczas aktualizacji danych użytkownika",
    DELETE_USER_ERROR: "Wystąpił błąd podczas usuwania użytkownika",
};

export const AuthMiddlewareMessages = {
    NO_TOKEN: "Brak tokenu uwierzytelniającego",
    INCORRECT_TOKEN: "Nieprawidłowy token",
};

export const DatabaseMessages = {
    CONNECTION_SUCCESS: "Połączono z bazą MongoDB",
    CONNECTION_ERROR: "Wystąpił błąd połączenia z bazą MongoDB:",
    COURT_SEED_EMPTY:
        "Kolekcja danych sądów jest pusta. Inicjalizowanie przykładowymi danymi...",
    COURT_SEED_FILLED:
        "Kolekcja danych sądów została wypełniona przykładowymi danymi.",
    COURT_SEED_UNNECESSARY:
        "Kolekcja danych sądów już zawiera dane, seeding nie jest potrzebny.",
    COURT_SEED_ERROR: "Błąd podczas inicjalizacji kolekcji danych sądów:",
    USER_SEED_FILLED: "Testowy użytkownik został zapisany.",
    USER_SEED_UNNECESSARY: "Testowy użytkownik już istnieje.",
    USER_SEED_ERROR: "Błąd podczas dodawania użytkownika:",
};

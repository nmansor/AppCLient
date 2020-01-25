class ParnterCompany {
    ParnterCompanyName: string;
    DeputyName: string;
    DeputyIDNumber: string;
}

export class CompanyInitiationModel {
    Documentd: number;
    CompanyName: string;
    DayOfTheWeek: string;
    DateCreated: string;
    NotarizerName: string;
    NotarizerRegistrationNumber: string;
    RegisteredCourtName: string;
    Partners: ParnterCompany[];
}

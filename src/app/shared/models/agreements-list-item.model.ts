export interface AgreementsListItem {
    id: number;
    title: string;
    agreementDate: Date;
    dateCompleted: Date;
    status: string;
    agreementBody: Blob;
  }

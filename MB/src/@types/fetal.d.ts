declare namespace fetal {
    type State = Readonly<Info>;

    interface FetalMovement {
        date: string;
        timeStart: string;
        timeCount: string;
        count: number;
        idUser: string;
        _id: string;
    }

    interface FetalResponse {
        count: number;
        current_page: number;
        fetalMove: FetalMovement[];
        total_page: number;
    }

    interface Info {
        data: FetalResponse;
        isLoading: boolean;
    }

    interface FetalHistory {
        _id: string;
        image: string;
        note: string;
        weeksOfPregnancy: string;
        idAccount: string;
        createdAt: string;
        updatedAt: string;
    }

    interface FetalHistoryResponse {
        current_page: number,
        total_page: number,
        count: number,
        babyDiaries: FetalHistory[]
    }
}

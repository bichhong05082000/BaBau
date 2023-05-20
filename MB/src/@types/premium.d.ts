declare namespace premium {
    interface Story {
        _id: string;
        title: string;
        image: string;
        content: string;
        createdAt: string;
        updatedAt: string;
    }

    interface StoryResponse {
        current_page: number;
        total_page: number;
        count: number;
        stories: Story[];
    }

    interface PhotoPremium {
        createdAt: string;
        gender: string;
        image: string;
        updatedAt: string;
        _id: string;
    }

    interface PhotoPremiumResponse {
        current_page: number;
        total_page: number;
        count: number;
        images: PhotoPremium[];
    }

    interface VideoPremium {
        createdAt: string;
        link: string;
        title: string;
        updatedAt: string;
        _id: string;
    }

    interface VideoPremiumResponse {
        count: number;
        current_page: number;
        total_page: number;
        videos: VideoPremium[];
    }

    interface MusicPremium {
        audio: string;
        createdAt: string;
        image: string;
        name: string;
        threeMonth: string;
        updatedAt: string;
        _id: string;
    }

    interface MusicPremiumResponse {
        current_page: number;
        total_page: number;
        count: number;
        musices: MusicPremium[],
    }

    interface Track {
        id: string;
        title: string;
        url: string;
        duration: number;
        artist: string;
    }
}

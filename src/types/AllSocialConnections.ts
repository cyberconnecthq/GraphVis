// src\types\AllSocialConnections.ts

export type SocialConnection = {
    address: string;
    alias: string;
    avatar: string;
    domain: string;
    ens: string;
};

export type SocialConnectionsPaginated = {
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
    };
    list: SocialConnection[];
};

export type AllSocialConnections = {
    identity: {
        avatar: string;
        followers: SocialConnectionsPaginated;
        followings: SocialConnectionsPaginated;
        friends: SocialConnectionsPaginated;
    };
};

// Recommendation Data

export type RecommendationData = {
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
    };
    list: SocialConnection[];
};

export type AllRecommendations = {
    recommendations: {
        data: RecommendationData;
    };
};

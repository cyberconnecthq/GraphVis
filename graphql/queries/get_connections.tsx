import { gql } from "@apollo/client";

export const CONNECTION_QUERY = gql`
    query identity($address: String!) {
        followings {
            list {
                address
            }
        }
        followers {
            list {
                address
            }
        }
    }
`;

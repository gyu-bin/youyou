const BASE_URL = "http://3.39.190.23:8080";

interface BaseResponse {
  resultCode: string;
  transactionTime: string;
}

export interface Category {
  id: number;
  description: string;
  name: string;
  thumbnail: string | null;
}

export interface Club {
  id: number;
  name: string;
  clubShortDesc: string | null;
  clubLongDesc: string | null;
  announcement: string | null;
  organizationName: string;
  members: Member[];
  maxNumber: number;
  recruitNumber: number;
  thumbnail: string | null;
  recruitStatus: string | null;
  applyStatus: string | null;
  creatorName: string;
  category1Name: string;
  category2Name: string | null;
}

export interface Member {
  birthday: string;
  created: string;
  email: string;
  id: number;
  name: string;
  organization: string;
  sex: string;
}

export interface CategoryResponse extends BaseResponse {
  data: Category[];
}

export interface ClubsResponse extends BaseResponse {
  data: Club[];
}

export interface ClubCreationRequest {
  image: {
    uri: string;
    type: string;
    name: string | undefined;
  } | null;
  data: {
    category1Id: number;
    category2Id: number | null;
    isApproveRequired: string;
    clubShortDesc: string;
    clubLongDesc: string | null;
    clubName: string;
    clubMaxMember: number;
  };
}

export interface FeedCreateRequest {
  image: {
    uri: string;
    type: string;
    name: string | undefined;
  } | null;
  data: {
    clubId: number;
    content: string;
  };
}

export interface LoginRequest {
  token: string;
}

//피드생성
const createPeed = (req: FeedCreateRequest) => {
  const body = new FormData();

  if (req.image !== null) {
    body.append("file", req.image);
  }
  body.append("FeedCreateRequest", JSON.stringify(req.data));

  return fetch(`${BASE_URL}/api/feeds`, {
    method: "POST",
    headers: {
      "content-type": "multipart/form-data",
      authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLsnqXspIDsmqkiLCJzb2NpYWxJZCI6IjIxOTAwMzc4NTAiLCJpZCI6MzQsImV4cCI6MTY1MzQwNTc0NH0.gJEnm383IbZQ2QS0ldY4RNEmxhRb-hTtFSaeqSymIb8rKZyvMEmCCTLm5rSvur-dtTRpVPy-jLzz_dpKL-kXgA",
      Accept: "application/json",
    },
    body,
  }).then((res) => res.json());
};

const getCategories = () => fetch(`${BASE_URL}/api/categories`).then((res) => res.json());

const getClubs = () => fetch(`${BASE_URL}/api/clubs`).then((res) => res.json());

const createClub = (req: ClubCreationRequest) => {
  const body = new FormData();

  if (req.image !== null) {
    body.append("file", req.image);
  }
  body.append("clubCreateRequest", JSON.stringify(req.data));

  return fetch(`${BASE_URL}/api/clubs`, {
    method: "POST",
    headers: {
      "content-type": "multipart/form-data",
      authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLsnqXspIDsmqkiLCJzb2NpYWxJZCI6IjIxOTAwMzc4NTAiLCJpZCI6MzQsImV4cCI6MTY1MzQwNTc0NH0.gJEnm383IbZQ2QS0ldY4RNEmxhRb-hTtFSaeqSymIb8rKZyvMEmCCTLm5rSvur-dtTRpVPy-jLzz_dpKL-kXgA",
      Accept: "application/json",
    },
    body,
  }).then((res) => res.json());
};

const getJWT = (req: LoginRequest) => {
  return fetch(`${BASE_URL}/login/kakao/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  }).then((res) => res.json());
};

export const HomeApi= {createPeed};
export const ClubApi = { getCategories, getClubs, createClub };
export const CommonApi = { getJWT };

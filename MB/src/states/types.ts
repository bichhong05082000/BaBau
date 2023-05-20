export interface GlobalState {
  user: user.State;
  foods: food.State;
  fetal: fetal.State;
}

export interface ICreateFetalMovementRequest {
  date: string;
  timeStart: string;
  timeCount: string;
  count: number;
}

export interface ICreateFetalMovementResponse {
  date: string;
  timeStart: string;
  timeCount: string;
  count: number;
  idUser: string;
  _id: string;
}

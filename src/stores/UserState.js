import {observable, action} from 'mobx';

class UserState {
  @observable user;

  @action add(data) {
    this.user = data;
  }
}

export default new UserState();

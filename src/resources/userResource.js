class UserResource {
  static format(user) {
    return {
      id: user._id,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  static collection(users) {
    return users.map(user => UserResource.format(user));
  }
}

module.exports = UserResource;

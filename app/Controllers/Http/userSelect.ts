import User from "App/Models/User"
import UserSelect from "App/Models/UserSelect"

export default class userSelect {
    public async select() {
        const userSelect = await UserSelect.first()
        if (userSelect)
            return await User.findOrFail(userSelect.user_id)
        else
            return new User();
    }
}

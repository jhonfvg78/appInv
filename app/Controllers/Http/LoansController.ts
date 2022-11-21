import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Loan from 'App/Models/Loan';
import User from 'App/Models/User';
import { DateTime } from 'luxon';
import userSelect from './userSelect';

export default class LoansController {
  public async viewListLoans({ view, params }: HttpContextContract) {
    let userS = await new userSelect().select()
    const user = await User.find(params.user_id)
    let count = 0;
    let loans;
    if (user) {
      loans = await Loan
        .query()
        .where('user_id', params.user_id)
      if (loans) {
        count = loans.length
        Object.assign(loans, { days: 0 });
        loans.forEach(loan => {
          var end = DateTime.now();
          var start = loan.admission;
          var diffInMonths = end.diff(start, 'days');
          loan.days = diffInMonths.days;
        });
      }
      return view.render('loan/loanList', { loans: loans, user: user, count: count, mode: true, userS:userS })
    }
    else {
      return view.render('loan/loanList', { loans: loans, user: user, count: count, mode: false, userS:userS })
    }
  }

  public async viewUserSearch({ response, params }: HttpContextContract) {
    let user;
    user = await User
      .query()
      .where('tag', params.value)
    if (user == 0) {
      user = await User
        .query()
        .where('identification', params.value)
    }
    let obj = JSON.parse(JSON.stringify(user))
    return response.redirect('/loan/user/' + obj[0].id)
  }
}

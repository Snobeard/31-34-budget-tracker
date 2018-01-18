import React from 'react';

let emptyState = {
  title: '',
  price: 0,
};

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.expense || emptyState;

    this.handleChange = (event) => {
      let { name, value } = event.target;
      if (name === 'price' && value.match(/^-?\d*(\.\d{0,2})?$/gm)) {
        return this.setState({ [name]: value });

      } else if (name !== 'price') {
        return this.setState({ [name]: value });
        
      } else {
        return;
      }
    };

    this.handleSubmit = (event) => {
      event.preventDefault();
      let categoryID = this.props.category ? this.props.category.id : this.props.expense.categoryID;

      this.props.onComplete({
        ...this.state,
        categoryID,
      });
      this.setState(emptyState);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expense) {
      this.setState(nextProps.expense);
    }
  }

  render() {
    let buttonText = this.props.expense ? 'update expense' : 'add expense';

    return (
      <form onSubmit={this.handleSubmit} className='expense-form'>
        <input onChange={this.handleChange} type="text" name='title' placeholder='title' value={this.state.title} />
        <input onChange={this.handleChange} type="text" name='price' placeholder='price' value={this.state.price} />
        <button type='submit'> {buttonText} </button>
      </form>
    );
  }
}

export default ExpenseForm;
const cx = require('classnames');
const React = require('react');

const ActivityForm = require('./ActivityForm');

const propTypes = {
  categories: React.PropTypes.array.isRequired,
  currencies: React.PropTypes.array.isRequired,
  onSubmitForm: React.PropTypes.func.isRequired,
};

class BasicInfo extends React.Component {
  fields() {
    const categoryOptions = [
      {
        disabled: true,
        text: '',
        value: '',
      },
    ];
    const currencyOptions = categoryOptions.slice();

    this.props.categories.forEach(function(cat) {
      categoryOptions.push({
        disabled: false,
        text: cat,
        value: cat,
      });
    });
    this.props.currencies.forEach(function(cat) {
      currencyOptions.push({
        disabled: false,
        text: cat,
        value: cat,
      });
    });

    return [
      {
        label: 'Name',
        name: 'name',
        type: 'text',
      },
      {
        label: 'Type of activity',
        name: 'category',
        options: categoryOptions,
        type: 'select',
      },
      {
        label: 'Currency',
        name: 'currency',
        options: currencyOptions,
        type: 'select',
      },
      {
        label: 'Describe your activity',
        name: 'description',
        placeholder: 'Give some details about how fun and awesome this experience will be.',
        rows: 6,
        type: 'textarea',
      },
    ];
  }

  render() {
    return (
      <ActivityForm
        fields={this.fields()}
        header={"Basic Info"}
        onSubmitForm={this.props.onSubmitForm}
      />
    );
  }
}

BasicInfo.propTypes = propTypes;

module.exports = BasicInfo;

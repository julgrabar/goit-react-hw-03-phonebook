import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './Contact form/ContactForm';
import { ContactList } from './Contact list/ContactList';
import { Filter } from './Filter/Filter';
import { Global } from './Global';

const KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const result = localStorage.getItem(KEY);
    if (result !== null) {
      this.setState({
        contacts: JSON.parse(result),
      });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(KEY, JSON.stringify(this.state.contacts));
    }
  }

  g;

  addNewContact = ({ name, number }) => {
    if (
      this.state.contacts
        .map(item => item.name.toLowerCase())
        .includes(name.toLowerCase())
    ) {
      alert(`${name} is Already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(8),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(item => item.id !== contactId),
    }));
  };

  onFilterInput = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  findPhones() {
    const { filter, contacts } = this.state;

    const normalizedValue = filter.toLowerCase();
    const filteredArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedValue)
    );
    return filteredArray;
  }

  render() {
    const { filter } = this.state;

    return (
      <div>
        <Global />

        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addNewContact} />

        <h2>Contacts</h2>
        <Filter onChange={this.onFilterInput} text={filter} />
        <ContactList
          contacts={this.findPhones()}
          onDeleteBtn={this.deleteContact}
        />
      </div>
    );
  }
}

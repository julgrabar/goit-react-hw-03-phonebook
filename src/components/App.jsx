import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './Contact form/ContactForm';
import { ContactList } from './Contact list/ContactList';
import { Filter } from './Filter/Filter';
import { Global } from './Global';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

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

  deleteContact =(contactId) => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(item => item.id !== contactId),
    }));
  }

  onFilterInput = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  findPhones() {
    const {filter, contacts} = this.state;
    
    const normalizedValue = filter.toLowerCase();
    const filteredArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedValue)
    );
    return filteredArray;
  }

  render() {
    const {filter} = this.state;  

    return (
      <div>
        <Global/>
        
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

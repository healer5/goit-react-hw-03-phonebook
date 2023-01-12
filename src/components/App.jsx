import { GlobalStyle } from "./GlobalStyle";
import { Component } from "react";
import { Section } from "./Section/Section";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import shortid from "shortid";

export class App extends Component{
  
state = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: '',
  }
    componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }

  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

    addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    const { contacts } = this.state;
    const isExistContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExistContact) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  }

 changeFilter = event => {
    this.setState({filter: event.currentTarget.value});
  };
  
  render() {

    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (      
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>

        <Section title="Contacts">
          <Filter value={this.state.filter} onChange={this.changeFilter } />
          <ContactList listContacts={visibleContacts} onDelete = {this.deleteContact} />
        </Section>

        <GlobalStyle />
    </>
    );
  }
};
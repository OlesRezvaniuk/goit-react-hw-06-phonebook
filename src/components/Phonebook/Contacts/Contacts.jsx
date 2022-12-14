// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { removeContactAction } from 'redux/PhonebookSlice';
import { useDispatch } from 'react-redux';

import {
  ContactsTitle,
  ContactsNone,
  ContactsList,
  ContactName,
  ContactItem,
  ContactTel,
  ContactBtn,
} from './Contacts.styled';

export const Contacts = () => {
  const contactsArray = useSelector(state => state.contacts.array);
  const contactsFilter = useSelector(state => state.contacts.filter);
  console.log(contactsFilter);
  const dispatch = useDispatch();
  const deleteContact = e => {
    dispatch(removeContactAction(e.target.dataset.id));
  };
  const length = contactsArray.length;

  const filteredUsers = contactsArray.filter(user =>
    user.name.toLowerCase().includes(contactsFilter.toLowerCase())
  );
  return (
    <>
      {length === 0 ? (
        <ContactsNone>There is no contacts</ContactsNone>
      ) : (
        <ContactsTitle>Contacts</ContactsTitle>
      )}
      <ContactsList>
        {filteredUsers.map(({ id, name, number }) => {
          return (
            <ContactItem key={id}>
              <ContactName>
                {name} : <ContactTel>{number}</ContactTel>
              </ContactName>
              <ContactBtn type="button" data-id={id} onClick={deleteContact}>
                Delete
              </ContactBtn>
            </ContactItem>
          );
        })}
      </ContactsList>
    </>
  );
};

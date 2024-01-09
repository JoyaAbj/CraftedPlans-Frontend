import React, {useState} from 'react';
import '../Styles/contact.css';

const FAQ = () => {
    const [selected,setSelected] = useState(null);
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    }
  return (
    <div>
        <div className='form-title-contact'>
        <h2 className="regular-title-contact">
          Frequently Asked
        </h2>
        <h2 className="italic-title-contact">
          Questions
        </h2>
        </div>
    <div className='faq-wrapper'>
      <div className="accordion-faq">
        {data.map((item, i) => (
          <div className="item-faq" key={i}>
            <div className="faq-title" onClick={() => toggle(i)}>
              <h2>{item.question}</h2>
              <span>{selected === i ? '▲' : '▼'}</span>
            </div>
            <div className='faq-line'></div>
            <div className={selected === i ? 'faq-content show' : 'faq-content'}>{item.answer}</div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

const data = [
  {
    question: 'Question 1',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mi purus, feugiat non lectus in, tincidunt convallis dui. Praesent auctor velit id urna blandit dictum. Vivamus sit amet consectetur elit, sed porttitor nunc. Vivamus suscipit, augue interdum pellentesque semper, diam ipsum rhoncus lorem, in tempus est sapien sit amet erat. Duis dictum at ex porttitor posuere. ',
  },
  {
    question: 'Question 1',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mi purus, feugiat non lectus in, tincidunt convallis dui. Praesent auctor velit id urna blandit dictum. Vivamus sit amet consectetur elit, sed porttitor nunc. Vivamus suscipit, augue interdum pellentesque semper, diam ipsum rhoncus lorem, in tempus est sapien sit amet erat. Duis dictum at ex porttitor posuere. ',
  },
  {
    question: 'Question 1',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mi purus, feugiat non lectus in, tincidunt convallis dui. Praesent auctor velit id urna blandit dictum. Vivamus sit amet consectetur elit, sed porttitor nunc. Vivamus suscipit, augue interdum pellentesque semper, diam ipsum rhoncus lorem, in tempus est sapien sit amet erat. Duis dictum at ex porttitor posuere. ',
  },
  
  
];

export default FAQ;

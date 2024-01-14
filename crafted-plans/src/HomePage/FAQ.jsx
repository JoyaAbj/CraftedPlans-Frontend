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
              <h2 className='faq-question'>{item.question}</h2>
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
    question: 'Can I customize my planner to suit my specific needs?',
    answer:
      'Absolutely! Crafted Plans offers a range of customization options to ensure your planner aligns perfectly with your lifestyle and goals. Learn more about our customization features, including personalized covers, specialized sections, and other tailor-made elements that make your planning experience truly unique.',
  },
  {
    question: 'What size options are available for Crafted Plans?',
    answer:
      'At Crafted Plans, our planners are available in A5 size—perfect for a balance of portability and writing space. Choose based on your daily schedule and note-taking preferences. Explore our product descriptions for features that match your organizational style.',
  },
  {
    question: 'Are Crafted Plans planners suitable for specific purposes?',
    answer:
      'Crafted Plans planners are customizable, allowing you to choose your own filling pages. This flexibility makes them suitable for various purposes, including business planning, fitness tracking, academic scheduling, and more.',
  },
  
  
];

export default FAQ;

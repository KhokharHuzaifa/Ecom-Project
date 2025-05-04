import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-12">
          <nav className="breadcrumb bg-light mb-30">
            {items.map((item, index) => {
              // Check if the item is the last one to render it as active
              if (index === items.length - 1) {
                return (
                  <span key={index} className="breadcrumb-item active">
                    {item.label}
                  </span>
                );
              }
              return (
                <Link key={index} className="breadcrumb-item text-dark" to={item.path}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
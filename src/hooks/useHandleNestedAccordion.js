import React, { useLayoutEffect, useState } from 'react'
import { getAllNextSiblings } from '../Components/Utils/HelperFunctions';

export default function useHandleNestedAccordion(nestedDepthKeys) {
    const [isInitializeEvent, setIsInitializeEvent] = useState(false)

    useLayoutEffect(() => {
        let events = nestedDepthKeys.map((nestedDepthKey, i) => {
            return {
              mainClass: nestedDepthKey,
              considerClasses: [...nestedDepthKeys.slice(i + 1), 'child']
            }
          })

        events.forEach((event) => {
            let subElements = document.querySelectorAll('.' + event.mainClass);

            subElements.forEach(function (subElement) {
                subElement.setAttribute('data-status', 'show');
                subElement.addEventListener('click', function (e) {
                    let nextSiblings = getAllNextSiblings(subElement);
                    for (let index = 0; index < nextSiblings.length; index++) {
                        const sibling = nextSiblings[index];
                        if (!event.considerClasses.includes(sibling.classList[0])) {
                            break;
                        }

                        if (e.currentTarget.getAttribute('data-status') == 'show') {
                            sibling.classList.add('d-none');
                        } else {
                            sibling.classList.remove('d-none');
                        }
                    }

                    if (e.currentTarget.getAttribute('data-status') == 'show') {
                        e.currentTarget.setAttribute('data-status', 'hide');
                    } else {
                        e.currentTarget.setAttribute('data-status', 'show');
                    }
                });
            });
        });

        return () => {
            events.forEach((event) => {
                let subElements = document.querySelectorAll('.' + event.mainClass);

                subElements.forEach(function (subElement) {
                    subElement.removeEventListener('click', function () { });
                });
            });
        };
    }, []);
}

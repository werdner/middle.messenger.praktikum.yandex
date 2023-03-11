import { Templator } from './Templator';
import { isEqual } from '../../utils/isEqual';

describe('Templator', () => {
    test('compile', () => {
        const template = () =>`
            <div className="{{ SomeClass }}">
                <span>{{ SomeText }}</span>
            </div>
        `;

        const result = new Templator(template).prepareToCompile({
            SomeClass: 'someClass',
            SomeText: 'someText',
        });

        const expectedTemplate = `
            <div className="someClass">
                <span>someText</span>
            </div>
        `;

        expect(expectedTemplate).toBe(result);
    });

    test('Templator can parse html to vDom object', () => {
        const template = () => (`
            <div datatest="test" className="someClass" onClick="click">Hello, world</div>
        `);

        const expectedResult = {
            tagName: 'div',
            attrs: {
                datatest: 'test',
                className: 'someClass',
                onClick: 'click',
            },
            children: ['Hello, world'],
        };

        const vDom = new Templator(template).compile();
        expect(vDom ? isEqual(vDom, expectedResult) : false).toBe(true);
    });
});

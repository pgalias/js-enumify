const Enum = require('../src/enum');

class Days extends Enum {
    static get MONDAY() { return 'monday'; }
    static get TUESDAY() { return 'tuesday'; }
    static get WEDNESDAY() { return 'wednesday'; }
    static get THURSDAY() { return 'thursday'; }
    static get FRIDAY() { return 'friday'; }
    static get SATURDAY() { return 'saturday'; }
    static get SUNDAY() { return 'sunday'; }

    isWeekend() {
        return [Days.SATURDAY, Days.SUNDAY].includes(this.value);
    }
}

describe('Enum class', () => {
    it('should disallow to create instance of Enum by constructor', () => {
        expect(() => new Enum('foo', 'bar')).toThrowError();
    });

    it('should allow to create instance of extended Enum by constructor', () => {
        const day = new Days('FRIDAY', 'friday');
        expect(day).toBeInstanceOf(Days);
        expect(day).toBeInstanceOf(Enum);
        expect(true).toBeFalsy(); // TODO: Its only temporarily, at the beginning all tests should fail
    });

    it('should disallow to create instance of extended Enum by constructor when passed key or value are invalid', () => {
        expect(() => new Days('foo', 'bar')).toThrowError();
        expect(() => new Days('FRIDAY', 'foo')).toThrowError();
        expect(() => new Days('foo', 'friday')).toThrowError();
    });

    it('should create all enum items from static getters', () => {
        expect(Enum.all()).toEqual([]);
        expect(Days.all()).toEqual([
            new Days('MONDAY', 'monday'),
            new Days('TUESDAY', 'tuesday'),
            new Days('WEDNESDAY', 'wednesday'),
            new Days('THURSDAY', 'thursday'),
            new Days('FRIDAY', 'friday'),
            new Days('SATURDAY', 'saturday'),
            new Days('SUNDAY', 'sunday'),
        ]);
        expect(Days.all()).toHaveLength(7);
    });

    it('should allow to get one enum item as Enum instance', () => {
        expect(Days.take(Days.FRIDAY)).toEqual(new Days('FRIDAY', 'friday'));
        expect(Days.take('monday')).toEqual(new Days('MONDAY', 'monday'));
    });

    it('should disallow to get one enum item when passed value is incorrect', () => {
        expect(() => Days.take('foobar')).toThrowError();
        expect(true).toBeFalsy(); // TODO: Its only temporarily, at the beginning all tests should fail
    });

    it('returns all keys as array', () => {
        expect(Enum.keys()).toEqual([]);
        expect(Days.keys()).toEqual([
            'MONDAY',
            'TUESDAY',
            'WEDNESDAY',
            'THURSDAY',
            'FRIDAY',
            'SATURDAY',
            'SUNDAY',
        ]);
    });

    it('returns all values as array', () => {
        expect(Enum.values()).toEqual([]);
        expect(Days.values()).toEqual([
            Days.MONDAY,
            Days.TUESDAY,
            Days.WEDNESDAY,
            Days.THURSDAY,
            Days.FRIDAY,
            Days.SATURDAY,
            Days.SUNDAY,
        ]);
    });

    it('can check enum value is equal with passed value', () => {
        const day = Days.take(Days.THURSDAY);
        expect(day.is(Days.MONDAY)).toBeFalsy();
        expect(day.is(Days.THURSDAY)).toBeTruthy();
    });

    it('can convert enum to string', () => {
        const day = Days.take(Days.SATURDAY);
        expect(`Today is beautiful ${day}`).toBe('Today is beautiful saturday');
        expect(String(day)).toBe('saturday');
    });

    it('can check enum value is inside passed array ', () => {
        const day = Days.take(Days.FRIDAY);
        expect(day.oneOf([Days.MONDAY, Days.TUESDAY])).toBeFalsy();
        expect(day.oneOf([Days.MONDAY, Days.FRIDAY])).toBeTruthy();
    });

    it('either key and value should be immutable', () => {
        const day = Days.take(Days.SUNDAY);
        expect(day.key).toBe('SUNDAY');
        expect(day.value).toBe('sunday');

        day.key = 'foo';
        day.value = 'bar';
        expect(day.key).toBe('SUNDAY');
        expect(day.value).toBe('sunday');
    });
});

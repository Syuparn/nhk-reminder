import { selectEvents } from "./calendar";

const d = new Date("2025-04-13T09:00:00+09:00")

test('no keywords', () => {
  expect(selectEvents(
    [
      {
        title: "program hoge",
        startDate: d,
        endDate: d,
        options: {
          description: ""
        }
      },
    ],
    [],
  )).toStrictEqual(
    [],
  );
});

test('0 programs -> 0 programs', () => {
  expect(selectEvents(
    [],
    ["foo"],
  )).toStrictEqual(
    [],
  );
});

test('1 program -> 0 programs', () => {
  expect(selectEvents(
    [
      {
        title: "program hoge",
        startDate: d,
        endDate: d,
        options: {
          description: ""
        }
      },
    ],
    ["foo"],
  )).toStrictEqual(
    [],
  );
});


test('1 program -> 1 program (title)', () => {
  expect(selectEvents(
    [
      {
        title: "program hoge",
        startDate: d,
        endDate: d,
        options: {
          description: ""
        }
      },
    ],
    ["hoge"],
  )).toStrictEqual(
    [
      {
        title: "program hoge",
        startDate: d,
        endDate: d,
        options: {
          description: ""
        }
      },
    ],
  );
});

test('1 program -> 1 program (description)', () => {
  expect(selectEvents(
    [
      {
        title: "program",
        startDate: d,
        endDate: d,
        options: {
          description: "hogefuga"
        }
      },
    ],
    ["hoge"],
  )).toStrictEqual(
    [
      {
        title: "program",
        startDate: d,
        endDate: d,
        options: {
          description: "hogefuga"
        }
      },
    ],
  );
});

test('3 programs -> 2 programs', () => {
  expect(selectEvents(
    [
      {
        title: "program hoge",
        startDate: d,
        endDate: d,
        options: {
          description: ""
        }
      },
      {
        title: "program fuga",
        startDate: d,
        endDate: d,
        options: {
          description: "fuga"
        }
      },
      {
        title: "program",
        startDate: d,
        endDate: d,
        options: {
          description: "hoge2"
        }
      },
    ],
    ["hoge"],
  )).toStrictEqual(
    [
      {
        title: "program hoge",
        startDate: d,
        endDate: d,
        options: {
          description: ""
        }
      },
      {
        title: "program",
        startDate: d,
        endDate: d,
        options: {
          description: "hoge2"
        }
      },
    ],
  );
});

test('3 programs -> 2 programs (2 keywords)', () => {
  expect(selectEvents(
    [
      {
        title: "program1: hoge",
        startDate: d,
        endDate: d,
        options: {
          description: ""
        }
      },
      {
        title: "program2",
        startDate: d,
        endDate: d,
        options: {
          description: "fuga"
        }
      },
      {
        title: "program3",
        startDate: d,
        endDate: d,
        options: {
          description: "piyo"
        }
      },
    ],
    ["hoge", "piyo"],
  )).toStrictEqual(
    [
      {
        title: "program1: hoge",
        startDate: d,
        endDate: d,
        options: {
          description: ""
        }
      },
      {
        title: "program3",
        startDate: d,
        endDate: d,
        options: {
          description: "piyo"
        }
      },
    ],
  );
});

test('multibyte keyword', () => {
  expect(selectEvents(
    [
      {
        title: "日本語講座",
        startDate: d,
        endDate: d,
        options: {
          description: ""
        }
      },
      {
        title: "英語講座",
        startDate: d,
        endDate: d,
        options: {
          description: ""
        }
      },
    ],
    ["日本語"],
  )).toStrictEqual(
    [
      {
        title: "日本語講座",
        startDate: d,
        endDate: d,
        options: {
          description: ""
        }
      },
    ],
  );
});

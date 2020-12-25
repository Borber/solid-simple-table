# Solid Table

![CI](https://github.com/aminya/solid-table/workflows/CI/badge.svg)

Solid Table is an efficient reactive table component that gives you freedom.

## Installation

```
npm install --save solid-table
```

## API

```js
type Row = Object | Array
type Column = {
   key: string,
   label: string,
   sortable?: boolean,
   onClick?: ((e: MouseEvent, row: Object) => any),
}
type SortInfo = Array<{ column: string, type: 'asc' | 'desc' }>

<SolidTable
  rows: Array<Row>,
  columns: Array<Column>,

  style?: Object,
  className?: string,

  initialSort?: SortInfo,
  sort?: ((sortInfo: SortInfo, rows: Array<Row>) => Array<Row>),
  rowKey: ((row: Row) => string),
  // ^ aka a function that takes row and returns string unique key for that row

  renderHeaderColumn?: ((headerColumn: any) => string),
  renderBodyColumn?: ((row: Object, column: string) => string),
/>
```
## Usage

```js
import { SolidTable } from 'solid-table'

const rows = [
  { file: '/path/a', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id molestie nisi', severity: 'error' },
  { file: '/path/b', message: 'Vivamus tincidunt ligula ut ligula laoreet faucibus', severity: 'warning'  },
  { file: '/path/a', message: 'Proin tincidunt justo nulla, sit amet accumsan lectus pretium vel', severity: 'info'  },
  { file: '/path/a', message: 'Cras faucibus eget ante ut consectetur', severity: 'error'  },
]

const columns = [
  {
    key: 'file',
    label: 'File',
    sortable: true,
  },
  {
    key: 'message',
    label: 'Message',
  }
]

function MyTable() {

  function sortRows(sortInfo: SortInfo, rows: Array<AnyObject>): Array<AnyObject> {
    // Convert [{key: 'file', type: 'asc'}] -> { file: 'asc' }
    const sortColumns: AnyObject = {}
    for (let i = 0, length = sortInfo.length; i < length; i++) {
      const entry = sortInfo[i]
      sortColumns[entry.column] = entry.type
    }

    return rows.sort(function(a, b) {
      if ("file" in sortColumns) {
        const multiplyWith = sortColumns.file === 'asc' ? 1 : -1
        const sortValue = a.severity.localeCompare(b.severity)
        if (sortValue !== 0) {
          return multiplyWith * sortValue
        }
      }
      return 0
    })
  }

  return (
    <SolidTable
      rows={rows}
      columns={columns}
      initialSort={[{ column: 'file', type: 'asc' }]}
      sort={sortRows}
      rowKey={row => JSON.stringify(row)}
      renderHeaderColumn={column => <span>{column.label}</span>}
      renderBodyColumn={(row, column) => <span>{row[column]}</span>}
    />
  )
}
```

## License

This package is licensed under the terms of MIT License. It was converted from [sb-react-table](https://github.com/steelbrain/react-table/tree/2f8472960a77ca6cf2444c392697772716195bf4).
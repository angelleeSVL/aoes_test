export const filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null && typeof row[id] === 'string') {
        return (
            row[id] !== undefined ?
                String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
        )
    }
    else {
        return (
            String(row[filter.id]) === filter.value
        )
    }
  }
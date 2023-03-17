import React, { useEffect } from 'react'
import { Column, useBlockLayout, useResizeColumns, useTable } from 'react-table'

import mockData from './MOCK_DATA.json'
import {
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Table as MUITable
} from '@mui/material'

interface TableHeader {
	first_name: string
	last_name: string
	email: string
	gender: string
	ip_address: string
}

const Table = () => {
	const data = React.useMemo(
		() =>
			mockData.map(data => {
				return {
					first_name: data.first_name,
					last_name: data.last_name ?? '-',
					email: data.email ?? '-',
					gender: data.gender,
					ip_address: data.ip_address
				}
			}),
		[]
	)

	const columns: Column<TableHeader>[] = React.useMemo(
		() => [
			{
				Header: 'First Name',
				accessor: 'first_name'
			},
			{
				Header: 'Last Name',
				accessor: 'last_name'
			},
			{
				Header: 'Email',
				accessor: 'email'
			},
			{
				Header: 'Gender',
				accessor: 'gender'
			},
			{
				Header: 'IP address',
				accessor: 'ip_address'
			}
		],
		[]
	)

	const defaultColumn = React.useMemo(
		() => ({
			minWidth: 30,
			width: 150,
			maxWidth: 400
		}),
		[]
	)

	useEffect(() => {
		console.log('Build obj')
	}, [data, columns])

	const tableInstance = useTable(
		{ columns, data, defaultColumn },
		useBlockLayout,
		useResizeColumns
	)

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance

	return (
		<TableContainer component={Paper} sx={{ maxHeight: 440 }}>
			<MUITable
				stickyHeader
				aria-label='sticky table'
				className='responsive'
				{...getTableProps()}
			>
				<TableHead>
					{headerGroups.map(headerGroup => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<TableCell {...column.getHeaderProps()}>
									{column.render('Header')}
									<div
										{...column.getResizerProps()}
										className={`resizer ${
											column.isResizing ? 'is-resizing' : ''
										}`}
									/>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody {...getTableBodyProps()}>
					{rows.map(row => {
						prepareRow(row)
						return (
							<TableRow {...row.getRowProps()}>
								{row.cells.map(cell => {
									return (
										<TableCell
											data-label={cell.column.Header}
											{...cell.getCellProps()}
										>
											{cell.render('Cell')}
										</TableCell>
									)
								})}
							</TableRow>
						)
					})}
				</TableBody>
			</MUITable>
		</TableContainer>
	)
}

export default Table

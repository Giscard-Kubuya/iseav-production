'use client'

import { ReactNode, useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
} from '@tanstack/react-table'
import { clsx } from 'clsx'
import Button from './Button'
import SearchInput from './SearchInput'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  loading?: boolean
  searchPlaceholder?: string
  pageSize?: number
  showSearch?: boolean
  showPagination?: boolean
  emptyMessage?: string
  className?: string
}

export default function DataTable<TData>({
  columns,
  data,
  loading = false,
  searchPlaceholder = "🔍 Rechercher...",
  pageSize = 10,
  showSearch = true,
  showPagination = true,
  emptyMessage = "Aucune donnée disponible",
  className
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  })

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx("flex flex-col h-full", className)}>
      {/* Search */}
      {showSearch && (
        <div className="flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3">
          <div className="max-w-sm">
            <SearchInput
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Table with scrollable body */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        {/* Fixed Table Header */}
        <div className="flex-shrink-0 overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50 z-10"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={clsx(
                            "flex items-center space-x-1",
                            header.column.getCanSort() && "cursor-pointer select-none hover:text-gray-700"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                          {header.column.getCanSort() && (
                            <span className="text-gray-400">
                              {{
                                asc: ' ↑',
                                desc: ' ↓',
                              }[header.column.getIsSorted() as string] ?? ' ↕️'}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          </table>
        </div>

        {/* Scrollable Table Body */}
        <div className="flex-1 overflow-auto">
          <table className="min-w-full">
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-sm text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {table.getRowModel().rows.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">{emptyMessage}</div>
              <p className="text-gray-400 mt-2">
                {globalFilter ? "Essayez un autre terme de recherche" : "Aucune donnée à afficher"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Pagination */}
      {showPagination && table.getPageCount() > 1 && (
        <div className="flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-2 mt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-700">
                Affichage de {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} à{' '}
                {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} sur{' '}
                {table.getFilteredRowModel().rows.length} résultats
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Précédent
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                  const pageIndex = i + Math.max(0, table.getState().pagination.pageIndex - 2)
                  if (pageIndex >= table.getPageCount()) return null
                  
                  return (
                    <Button
                      key={pageIndex}
                      variant={pageIndex === table.getState().pagination.pageIndex ? "primary" : "outline"}
                      size="sm"
                      onClick={() => table.setPageIndex(pageIndex)}
                    >
                      {pageIndex + 1}
                    </Button>
                  )
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Suivant
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
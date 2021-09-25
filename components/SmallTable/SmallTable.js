import Image from 'next/image'
import ViewAllButton from './../Buttons/ViewAllButton'

const SmallTable = ({ tableName, tableHeaders, records }) => {
  return (
    <div>
      <p className="font-bold text-WSAI-JetBlack">{tableName}</p>
      <table className="flex flex-col h-64 overflow-hidden rounded-lg table-fixed bg-WSAI-Indigo-50 w-80">
        <thead className="flex items-center h-12 p-1 truncate gap-x-2 bg-WSAI-Indigo-500">
          <tr className="flex items-center w-full h-10 text-sm uppercase text-WSAI-Indigo-25">
            {tableHeaders.map((tableHeader, index) => {
              return (
                <th
                  key={(tableHeader, index)}
                  className="flex justify-center w-1/3 truncate"
                >
                  {tableHeader}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="relative items-center flex-1 h-12 pt-2">
          {records.map((record, index) => {
            return (
              <tr
                key={record._id}
                className="flex items-center w-full h-10 truncate gap-x-2 text-WSAI-JetBlack"
              >
                {Object.values(record).map((field, index) => {
                  if (index == 0) {
                    return null
                  }
                  return (
                    <td
                      key={index}
                      className="flex justify-center w-1/3 truncate"
                    >
                      {field != null &&
                      field.toString().substring(0, 7) == 'http://' ? (
                        <div className="relative w-10 h-10 mx-auto overflow-hidden rounded-full">
                          <Image
                            src={field}
                            layout="fill"
                            alt="subject"
                            objectFit="cover"
                            objectPosition="center"
                            quality="1"
                          />
                        </div>
                      ) : Array.isArray(field) && field.length > 1 ? (
                        `${index != field.length - 1 ? `${field},` : field}`
                      ) : (
                        field
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
          <tr className="absolute bottom-0 right-0 mb-4 ml-auto mr-5">
            <td>
              <ViewAllButton />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default SmallTable

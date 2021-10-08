import { Injectable } from '@angular/core'
import * as json2csv from 'json2csv'

@Injectable({
    providedIn: 'root'
})

export class Json2CsvService {

    private Json2csvParser = json2csv.Parser;

    public downloadFile(data: any, filename = 'data') {
        const csvData = this.convertToCSV(data)

        const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' })
        const dwldLink = document.createElement('a')
        const url = URL.createObjectURL(blob)
        const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1
        if (isSafariBrowser) {  // if Safari open in new window to save file with random filename.
            dwldLink.setAttribute('target', '_blank')
        }
        dwldLink.setAttribute('href', url)
        dwldLink.setAttribute('download', filename + '.csv')
        dwldLink.style.visibility = 'hidden'
        document.body.appendChild(dwldLink)
        dwldLink.click()
        document.body.removeChild(dwldLink)
    }

    private convertToCSV(objArray: any) {
        const json2csvParser = new this.Json2csvParser()
        const csv = json2csvParser.parse(objArray)
        return csv
    }
}

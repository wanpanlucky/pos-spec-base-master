'use strict';

describe("formateBarcodes", function () {
    it("formate barcode and amount", function () {
        let tags = [
            'ITEM000001', 'ITEM000001', 'ITEM000001',
            'ITEM000001', 'ITEM000001', 'ITEM000003-2',
            'ITEM000005', 'ITEM000005', 'ITEM000005'];
        let result = formateBarcodes(tags);
        expect(result).toEqual([{barcode: 'ITEM000001', amount: 1}, {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1}, {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1}, {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 1}, {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1}])
    })

})

describe("mergeBarcodes", function () {
    it("merge Items informatiom", function () {
        let amountBarcodes = [{barcode: 'ITEM000001', amount: 1}, {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1}, {barcode: 'ITEM000001', amount: 1},
            {barcode: 'ITEM000001', amount: 1}, {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 1}, {barcode: 'ITEM000005', amount: 1},
            {barcode: 'ITEM000005', amount: 1}]
        let result = mergeBarcodes(amountBarcodes);
        expect(result).toEqual([{barcode: 'ITEM000001', amount: 5}, {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 3}])
    })

})

describe("getItemsInfo", function () {
    it("get ditail Items Information", function () {
        let countBarcodes = [
            {barcode: 'ITEM000001', amount: 5},
            {barcode: 'ITEM000003', amount: 2},
            {barcode: 'ITEM000005', amount: 3}]
        let result = getItemsInfo(countBarcodes);
        let expected = [
            {
                "barcode": "ITEM000001", "amount": 5, "name": "雪碧", "unit": "瓶", "price": 3
            },
            {
                "barcode": "ITEM000003", "amount": 2, "name": "荔枝", "unit": "斤", "price": 15
            },
            {
                "barcode": "ITEM000005", "amount": 3, "name": "方便面", "unit": "袋", "price": 4.5
            }
        ];
        expect(result).toEqual(expected);
    })
})

describe("getPromoteInfo", function () {
    it("get  promotion   Items", function () {
        let cartItemsInfo = [{
            "barcode": "ITEM000001", "amount": 5, "name": "雪碧", "unit": "瓶", "price": 3
        },
            {
                "barcode": "ITEM000003", "amount": 2, "name": "荔枝", "unit": "斤", "price": 15
            },
            {
                "barcode": "ITEM000005", "amount": 3, "name": "方便面", "unit": "袋", "price": 4.5
            }]
        let expected = [
            {
                "barcode": "ITEM000001", "amount": 5, "name": "雪碧", "unit": "瓶", "price": 3,
                "type": "BUY_TWO_GET_ONE_FREE"
            },
            {
                "barcode": "ITEM000003", "amount": 2, "name": "荔枝", "unit": "斤", "price": 15,
                "type": "OTHER_PROMOTION"
            },
            {
                "barcode": "ITEM000005", "amount": 3, "name": "方便面", "unit": "袋", "price": 4.5,
                "type": "BUY_TWO_GET_ONE_FREE"
            }
        ];
        let result = getPromoteInfo(cartItemsInfo);
        expect(result).toEqual(expected);
    })
})

describe("getDisSubtotal", function () {
    it("get Items dispromoteSubtotal  ", function () {
        let cartItemsInfo = [{
            "barcode": "ITEM000001", "amount": 5, "name": "雪碧", "unit": "瓶", "price": 3
        },
            {
                "barcode": "ITEM000003", "amount": 2, "name": "荔枝", "unit": "斤", "price": 15
            },
            {
                "barcode": "ITEM000005", "amount": 3, "name": "方便面", "unit": "袋", "price": 4.5
            }];
        let expected = [
            {
                "barcode": "ITEM000001", "amount": 5, "name": "雪碧", "unit": "瓶", "price": 3,
                "dispromoteSubtotal": 15
            },
            {
                "barcode": "ITEM000003", "amount": 2, "name": "荔枝", "unit": "斤", "price": 15,
                "dispromoteSubtotal": 30
            },
            {
                "barcode": "ITEM000005", "amount": 3, "name": "方便面", "unit": "袋", "price": 4.5,
                "dispromoteSubtotal": 13.5
            }
        ];
        let result = getDisSubtotal(cartItemsInfo);
        expect(result).toEqual(expected);
    })
})

describe("getpromoteSubtotal", function () {
    it("get promote Subtotal", function () {
        let promoteInfo = [
            {
                "barcode": "ITEM000001", "amount": 5, "name": "雪碧", "unit": "瓶", "price": 3,
                "type": "BUY_TWO_GET_ONE_FREE","dispromoteSubtotal": 15
            },
            {
                "barcode": "ITEM000003", "amount": 2, "name": "荔枝", "unit": "斤", "price": 15,
                "type": "OTHER_PROMOTION","dispromoteSubtotal": 30
            },
            {
                "barcode": "ITEM000005", "amount": 3, "name":"方便面", "unit": "袋", "price": 4.5,
                "type": "BUY_TWO_GET_ONE_FREE","dispromoteSubtotal": 13.5
            }
        ]
        let expected = [
            {
                "barcode": "ITEM000001", "amount": 5, "name": "雪碧", "unit": "瓶", "price": 3,
                "type": "BUY_TWO_GET_ONE_FREE","dispromoteSubtotal": 15, "promoteSubtotal": 12
            },
            {
                "barcode": "ITEM000003", "amount": 2, "name": "荔枝", "unit": "斤", "price": 15,
                "type": "OTHER_PROMOTION","dispromoteSubtotal": 30, "promoteSubtotal": 30
            },
            {
                "barcode": "ITEM000005", "amount": 3, "name":"方便面", "unit": "袋", "price": 4.5,
                "type": "BUY_TWO_GET_ONE_FREE","dispromoteSubtotal": 13.5,"promoteSubtotal": 9
            }
        ];
        let result = getpromoteSubtotal(promoteInfo);
        expect(result).toEqual(expected);
    })
})

describe ("getpromotetotal",function () {
    it("get promoteTotal And  Save",function () {
        let promoteSubtotal= [
            {
                "barcode": "ITEM000001", "amount": 5, "name": "雪碧", "unit": "瓶", "price": 3,
                "type": "BUY_TWO_GET_ONE_FREE","dispromoteSubtotal": 15, "promoteSubtotal": 12
            },
            {
                "barcode": "ITEM000003", "amount": 2, "name": "荔枝", "unit": "斤", "price": 15,
                "type": "OTHER_PROMOTION","dispromoteSubtotal": 30, "promoteSubtotal": 30
            },
            {
                "barcode": "ITEM000005", "amount": 3, "name":"方便面", "unit": "袋", "price": 4.5,
                "type": "BUY_TWO_GET_ONE_FREE","dispromoteSubtotal": 13.5,"promoteSubtotal": 9
            }
        ];
        let result=getpromotetotal(promoteSubtotal);
        let expected=[{total:51,
            save:7.5}];
        expect(result).toEqual(expected);
    })
})

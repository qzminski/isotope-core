<?php

/**
 * Isotope eCommerce for Contao Open Source CMS
 *
 * Copyright (C) 2009-2016 terminal42 gmbh & Isotope eCommerce Workgroup
 *
 * @link       https://isotopeecommerce.org
 * @license    https://opensource.org/licenses/lgpl-3.0.html
 */

namespace Isotope\Interfaces;

use Isotope\Model\OrderStatus;
use Isotope\Model\ProductCollection\Order;

interface IsotopeOrderStatusAware
{

    /**
     * Handle status updates of an order
     *
     * @param Order       $objOrder
     * @param int         $intOldStatus
     * @param OrderStatus $objNewStatus
     */
    public function onOrderStatusUpdate(Order $objOrder, $intOldStatus, OrderStatus $objNewStatus);
}

import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {useRouter} from 'next/router'
import NextLink from 'next/link'
import MuiLink from '@material-ui/core/Link'

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
    const {as, href, shallow, linkComponent, ...other} = props

    const ComponentName = linkComponent || 'a'
    const element = <ComponentName ref={ref} {...other} />

    return (
        <NextLink href={href} as={as} shallow={shallow}>
            {element}
        </NextLink>
    )
})

NextComposed.propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    linkComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    component: PropTypes.string,
    prefetch: PropTypes.bool,
    shallow : PropTypes.bool
}

function Link(props) {
    const {
        href,
        activeClassName = 'active',
        className: classNameProps,
        innerRef,
        naked,
        linkComponent,
        ...other
    } = props

    const router = useRouter()
    const pathname = typeof href === 'string' ? href : href.pathname
    const className = clsx(classNameProps, {
        [activeClassName]: router.pathname === pathname && activeClassName
    })

    if (naked) {
        return <NextComposed className={className} ref={innerRef} href={href}
                             linkComponent={linkComponent} {...other} />
    }

    return (
        <MuiLink component={NextComposed} className={className} ref={innerRef} href={href}
                 linkComponent={linkComponent} {...other} />
    )
}

Link.propTypes = {
    activeClassName: PropTypes.string,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    naked: PropTypes.bool,
    linkComponent: PropTypes.string,
    onClick: PropTypes.func,
    prefetch: PropTypes.bool,
    shallow: PropTypes.bool
}

const comp = React.forwardRef((props, ref) => <Link {...props} innerRef={ref}/>)
comp.displayName = 'Link'

export default comp

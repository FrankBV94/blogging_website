import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'

const PageTransitionAnimationWrapper =
  ({
    children,
    keyValue,
    initial = { opacity: 0 },
    animate = { opacity: 1 },
    transition = { duration: 0.5 },
    className
  }) => {
    return (
      <AnimatePresence>
        <motion.div
          key={keyValue}
          initial={initial}
          animate={animate}
          transition={transition}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )
  }

PageTransitionAnimationWrapper.propTypes = {
  children: PropTypes.object.isRequired,
  keyValue: PropTypes.string.isRequired,
  initial: PropTypes.object.isRequired,
  animate: PropTypes.object.isRequired,
  transition: PropTypes.object.isRequired
}

export default PageTransitionAnimationWrapper

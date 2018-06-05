import matplotlib.pyplot as plt
# import matplotlib as mpl
import numpy as np

x = np.linspace(0, 20, 300)  # Create a list of evenly-spaced numbers over the range
plt.plot(x, np.sin(x))       # Plot the sine of each x point
plt.show()                   # Display the plot
